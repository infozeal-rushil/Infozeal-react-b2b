import React, { useEffect, useState } from 'react';
import { Row, Col, Tab, Form, FloatingLabel } from 'react-bootstrap';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import useWizardForm from '@globals/g-hooks/useWizardForm';
import WizardForm from '@globals/g-components/wizard/WizardForm';
import WizardFormProvider from '@globals/g-providers/WizardFormProvider';
import WizardFormFooter from '@globals/g-components/wizard/WizardFormFooter';
// import your actual forms and nav data below
// import CompanyDetailsForm from '@globals/g-components/modules/client-company/add-company/CompanyDetailsForm';
// import CompanyLocationForm from '@globals/g-components/modules/client-company/add-company/CompanyLocationForm';
// import CompanyPreview from '@globals/g-components/modules/client-company/add-company/CompanyPreview';
import WizardSideNav from '@globals/g-components/wizard/WizardSideNav';
// import { addCompanyWizardNav } from '@globals/g-data/wizard/wizard';
// import { addCompanyDefaultFormData } from '@globals/g-data/client-company/addCompany';

const addCompanyWizardNav = [
  { eventKey: 1, label: 'Company Details' },
  { eventKey: 2, label: 'D.B. Configration' },
  { eventKey: 3, label: 'User Details' }
];

const clientCompanyDefaultFormData = {
  // Fill with your default form data structure
};

const ClientCompanyMaster = () => {
  const [tabEventKey, setTabEventKey] = useState(1);
  const form = useWizardForm({
    totalStep: 3
  });

  useEffect(() => {
    form.setFormData(clientCompanyDefaultFormData);
  }, []);

  const onChange = form.handleChange;

  return (
    <div className="mb-9">
      <PageBreadcrumb items={defaultBreadcrumbItems} />
      <WizardFormProvider {...form}>
        <Row className="gx-0 gx-xl-5 theme-wizard">
          <Col xl={{ order: 1, span: 4 }}>
            <div className="scrollbar mb-4">
              <WizardSideNav
                navItems={addCompanyWizardNav}
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
                      {/* --- Company Information Section --- */}
                      <h4 className="mt-6 mb-3">Company Information</h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel controlId="companyName" label="Name">
                            <Form.Control
                              type="text"
                              name="companyName"
                              placeholder="Name"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel controlId="companyCity" label="City">
                            <Form.Control
                              type="text"
                              name="companyCity"
                              placeholder="City"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel controlId="companyEmail" label="Email">
                            <Form.Control
                              type="email"
                              name="companyEmail"
                              placeholder="Email"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="validityDate"
                            label="Validity Date"
                          >
                            <Form.Control
                              type="date"
                              name="validityDate"
                              placeholder="Validity Date"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel controlId="mobileNo" label="Mobile No">
                            <Form.Control
                              type="text"
                              name="mobileNo"
                              placeholder="Mobile No"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel controlId="phoneNo" label="Phone No">
                            <Form.Control
                              type="text"
                              name="phoneNo"
                              placeholder="Phone No"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                      {/* --- End Company Information Section --- */}
                    </WizardForm>
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <WizardForm step={2}>
                      {/* --- D.B. Configuration Section --- */}
                      <h4 className="mt-6 mb-3">D.B. Configuration</h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel controlId="dbSrNo" label="Sr. No">
                            <Form.Control
                              type="text"
                              name="dbSrNo"
                              placeholder="Sr. No"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel controlId="dbIp" label="Ip">
                            <Form.Control
                              type="text"
                              name="dbIp"
                              placeholder="Ip"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel controlId="dbName" label="Name">
                            <Form.Control
                              type="text"
                              name="dbName"
                              placeholder="Name"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="dbPassword"
                            label="PassWord"
                          >
                            <Form.Control
                              type="password"
                              name="dbPassword"
                              placeholder="PassWord"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                      {/* --- End D.B. Configuration Section --- */}
                    </WizardForm>
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <WizardForm step={3}>
                      <h4 className="mt-6 mb-3">User</h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel controlId="userName" label="Name">
                            <Form.Control
                              type="text"
                              name="userName"
                              placeholder="Name"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel controlId="userEmail" label="Email">
                            <Form.Control
                              type="email"
                              name="userEmail"
                              placeholder="Email"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="userPassword"
                            label="Password"
                          >
                            <Form.Control
                              type="password"
                              name="userPassword"
                              placeholder="Password"
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="userActive"
                            label="User Active"
                          >
                            <Form.Select
                              name="userActive"
                              onChange={onChange}
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Select Status
                              </option>
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </WizardForm>
                  </Tab.Pane>
                </Tab.Content>
                <div className="mt-6">
                  <WizardFormFooter />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </WizardFormProvider>
    </div>
  );
};

export default ClientCompanyMaster;
