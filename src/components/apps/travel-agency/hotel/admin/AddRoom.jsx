// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import React, { useEffect, useState } from 'react';
import { Row, Col, Tab } from 'react-bootstrap';
import useWizardForm from '@globals/g-hooks/useWizardForm';
import WizardForm from '@globals/g-components/wizard/WizardForm';
import WizardFormProvider from '@globals/g-providers/WizardFormProvider';
import RoomDetailsForm from '@globals/g-components/modules/travel-agency/hotel/add-room/RoomDetailsForm';
import { addRoomWizardNav } from '@globals/g-data/wizard/wizard';
import RoomWizardFooter from '@globals/g-components/modules/travel-agency/hotel/add-room/RoomWizardFooter';
import Pricing from '@globals/g-components/modules/travel-agency/hotel/add-room/Pricing';
import Amenities from '@globals/g-components/modules/travel-agency/hotel/add-room/Amenities';
import AddPhotos from '@globals/g-components/modules/travel-agency/hotel/add-proterty/AddPhotos';
import Preview from '@globals/g-components/modules/travel-agency/hotel/add-room/Preview';
import WizardSideNav from '@globals/g-components/wizard/WizardSideNav';
import { urlToFile } from '@globals/g-helpers/utils';
import { pictures } from '@globals/g-data/travel-agency/addProperty';
import { addRoomDefaultFormData } from '@globals/g-data/travel-agency/addRoom';
const AddRoom = () => {
  const [images, setImages] = useState([]);
  const form = useWizardForm({
    totalStep: 5
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
      Object.assign(Object.assign({}, addRoomDefaultFormData), {
        pictures: images
      })
    );
  }, [images]);
  return (
    <div className="mb-9">
      <PageBreadcrumb className="mb-3" items={defaultBreadcrumbItems} />
      <h2 className="fs-5 mb-4 mb-xl-5">Add New Room</h2>
      <WizardFormProvider {...form}>
        <Row className="gx-0 gx-xl-5 theme-wizard">
          <Col xl={{ order: 1, span: 4 }}>
            <WizardSideNav navItems={addRoomWizardNav} />
          </Col>
          <Col xl={8} className="flex-1">
            <Row className="mt-4 mt-xl-0">
              <Col xxl={8}>
                <Tab.Content>
                  <Tab.Pane eventKey={1}>
                    <WizardForm step={1}>
                      <RoomDetailsForm />
                    </WizardForm>
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <WizardForm step={2}>
                      <Pricing />
                    </WizardForm>
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <WizardForm step={3}>
                      <Amenities />
                    </WizardForm>
                  </Tab.Pane>
                  <Tab.Pane eventKey={4}>
                    <WizardForm step={4}>
                      <AddPhotos title="Add room picture" images={images} />
                    </WizardForm>
                  </Tab.Pane>
                  <Tab.Pane eventKey={5}>
                    <WizardForm step={5}>
                      <Preview />
                    </WizardForm>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Col>
        </Row>
        <RoomWizardFooter />
      </WizardFormProvider>
    </div>
  );
};
export default AddRoom;
