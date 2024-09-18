import { Modal } from "react-native";

interface modalProps{
    backgroundColor?: string
    width: number
    heigth: number
     
    onRequestCode: () => {}
}

const ModalComponent = (props: modalProps) => {
    const {  } = props
    
    return (
        <Modal>

        </Modal>    
    );
}

export default ModalComponent;