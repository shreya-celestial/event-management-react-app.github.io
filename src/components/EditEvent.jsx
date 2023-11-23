import { useParams } from 'react-router-dom';

const EditEvent = () => {
    const params = useParams();
    console.log(params)

    return (
        <>
            hellooo edit
        </>
    );
}

export default EditEvent;