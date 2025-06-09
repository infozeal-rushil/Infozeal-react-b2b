// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
import WizardForm from '@globals/g-components/wizard/WizardForm';
import useWizardForm from '@globals/g-hooks/useWizardForm';
import WizardFormProvider from '@globals/g-providers/WizardFormProvider';
import { Col, Row, Tab } from 'react-bootstrap';
import WizardFormFooter from '@globals/g-components/wizard/WizardFormFooter';
import classNames from 'classnames';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
// import BasicInformationForm from '@globals/g-components/modules/travel-agency/dashboard/hotel/add-proterty/BasicInformationForm';
import LocationForm from '@globals/g-components/modules/travel-agency/hotel/add-proterty/LocationForm';
import GeneralAmenitiesForm from '@globals/g-components/modules/travel-agency/hotel/add-proterty/GeneralAmenitiesForm';
import AddPhotos from '@globals/g-components/modules/travel-agency/hotel/add-proterty/AddPhotos';
import FinanceForm from '@globals/g-components/modules/travel-agency/hotel/add-proterty/FinanceForm';
import Preview from '@globals/g-components/modules/travel-agency/hotel/add-proterty/Preview';
import { addPropertyWizardNav } from '@globals/g-data/wizard/wizard';
import WizardSideNav from '@globals/g-components/wizard/WizardSideNav';
import { useEffect, useState } from 'react';
import { urlToFile } from '@globals/g-helpers/utils';
import {
  addPropertyDefaultFormData,
  pictures
} from '@globals/g-data/travel-agency/addProperty';
import PoliciesForm from '@globals/g-components/modules/travel-agency/hotel/add-proterty/PoliciesForm';
import BasicInformationForm from '@globals/g-components/modules/travel-agency/hotel/add-proterty/BasicInformationForm';
const AddProperty = () => {
  const [images, setImages] = useState([]);
  const [tabEventKey, setTabEventKey] = useState(1);
  const form = useWizardForm({
    totalStep: 7
  });
  useEffect(() => {
    const loadImages = () => {
      const imageFiles = Promise.all(
        pictures.map(picUrl => {
          return urlToFile(picUrl);
        })
      );
      setImages(imageFiles);
    };
    loadImages();
  }, []);
  useEffect(() => {
    form.setFormData(
      Object.assign(Object.assign({}, addPropertyDefaultFormData), {
        photos: images
      })
    );
  }, [images]);
  return (
    <>
      <div className="mb-9">
        <PageBreadcrumb items={defaultBreadcrumbItems} />
        <h2 className="fs-5 mb-4 mb-xl-5">Add New Property </h2>
        <WizardFormProvider {...form}>
          <Row className="gx-0 gx-xl-5 theme-wizard">
            <Col xl={{ order: 1, span: 4 }}>
              <div className="scrollbar mb-4">
                <WizardSideNav
                  navItems={addPropertyWizardNav}
                  setTabEventKey={setTabEventKey}
                />
              </div>
            </Col>
            <Col xl={8} className="flex-1">
              <Row>
                <Col xxl={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey={1}>
                      <WizardForm step={1}>
                        <BasicInformationForm />
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={2}>
                      <WizardForm step={2}>
                        <LocationForm tabEventKey={tabEventKey} />
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={3}>
                      <WizardForm step={3}>
                        <GeneralAmenitiesForm />
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={4}>
                      <WizardForm step={4}>
                        <AddPhotos
                          title="Add property picture"
                          images={images}
                        />
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={5}>
                      <WizardForm step={5}>
                        <FinanceForm />
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={6}>
                      <WizardForm step={6}>
                        <PoliciesForm />
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={7}>
                      <WizardForm step={7}>
                        <Preview />
                      </WizardForm>
                    </Tab.Pane>
                  </Tab.Content>
                  <div className="mt-6">
                    <WizardFormFooter
                      hidePrevBtn
                      className={classNames({ 'd-none': !form.getCanNextPage })}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </WizardFormProvider>
      </div>
    </>
  );
};
export default AddProperty;
