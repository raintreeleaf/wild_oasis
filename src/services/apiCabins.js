import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  //file name should be unique when uploading to bucket
  //slashes would create folders. we don't want that.
  // https://ztobqhaewifcjgmhjldc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImagePath = typeof newCabin.image === "string";
  console.log("path", hasImagePath);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //creating/edit new cabin
  let query = supabase.from("cabins");

  //create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  // This is for supabase-js specifically. We implement a promise like interface that allows us chain various query and filter builders together. Calling the .then() method tells us that your chain is complete: https://github.com/supabase/postgrest-js/blob/master/src/PostgrestBuilder.ts#L48
  if (error) {
    throw new Error("Cabins could not be created");
  }
  //uploading image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image, {
        cacheControl: "3600",
        upsert: false,
      });
    //delete cabin if error in uploading image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error("Image upload error; cabin could not be created");
    }
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select("*");
  if (error) {
    throw new Error("Cabins could not be deleted");
  }
  console.log("deleted data", data);
  return data;
}
