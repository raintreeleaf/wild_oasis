import CreateCabinForm from "./CreateCabinForm";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={(_) => setIsOpenModal((show) => !show)}>
//         Add New Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={(_) => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={(_) => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
export default AddCabin;
