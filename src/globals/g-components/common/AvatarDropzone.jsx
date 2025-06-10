var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
const AvatarDropzone = (_a) => {
    var { className, onDrop } = _a, rest = __rest(_a, ["className", "onDrop"]);
    const { getRootProps, getInputProps } = useDropzone(Object.assign({ multiple: false, onDrop, accept: {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        } }, rest));
    return (<>
      <div {...getRootProps()} className={classNames(className, 'dropzone px-2 py-3')}>
        <input {...getInputProps()}/>
        <div className="text-center text-body-emphasis">
          <h5 className="mb-2">
            <FontAwesomeIcon icon={faUpload} className="me-2"/>
            Upload Profile Picture
          </h5>
          <p className="mb-0 fs-9 text-body-tertiary text-opacity-85 lh-sm">
            Upload a 300x300 jpg image with <br />a maximum size of 400KB
          </p>
        </div>
      </div>
    </>);
};
export default AvatarDropzone;
