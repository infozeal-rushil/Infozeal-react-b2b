import Dropzone from 'components/base/Dropzone';
import { useWizardFormContext } from 'providers/WizardFormProvider';
import { useEffect, useState } from 'react';
const AddPhotos = ({ title, images }) => {
    const methods = useWizardFormContext();
    const { formData, setFormData } = methods;
    const [photos, setPhotos] = useState(images);
    useEffect(() => {
        setFormData(Object.assign(Object.assign({}, formData), { photos: photos }));
    }, [photos]);
    return (<>
      <h3 className="mb-6">{title}</h3>

      <Dropzone accept={{
            'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }} defaultFiles={photos.length ? photos : images} setPhotos={setPhotos} className="border border-dashed" onDrop={(acceptedFiles) => {
            setFormData(Object.assign(Object.assign({}, formData), { photos: acceptedFiles }));
        }}/>
    </>);
};
export default AddPhotos;
