import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Tab,
  Form,
  FloatingLabel,
  Alert,
  Spinner
} from 'react-bootstrap';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import useWizardForm from '@globals/g-hooks/useWizardForm';
import WizardForm from '@globals/g-components/wizard/WizardForm';
import WizardFormProvider from '@globals/g-providers/WizardFormProvider';
import WizardFormFooter from '@globals/g-components/wizard/WizardFormFooter';
import WizardSideNav from '@globals/g-components/wizard/WizardSideNav';
import {
  funcAddClientConfigure,
  resetAddClientConfigureState
} from '@globals/g-store/slice/ClientCompanyMaster/ClientConfigureSlice';

const addCompanyWizardNav = [
  { eventKey: 1, label: 'Company Details' },
  { eventKey: 2, label: 'User Details' },
  { eventKey: 3, label: 'D.B. Configuration' }
];

const clientCompanyDefaultFormData = {
  companyName: '',
  companyCity: '',
  companyEmail: '',
  mobileNo: '',
  phoneNo: '',
  branchName: '',
  branchType: '',
  validityDate: '',
  userName: '',
  userEmail: '',
  userPassword: '',
  userActive: true,
  dbIp: '',
  dbPassword: '',
  dbActive: true
};

const ClientCompanyMaster = () => {
  const [tabEventKey, setTabEventKey] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    state => state.addClientConfigure
  );
  const form = useWizardForm({ totalStep: 3 }, clientCompanyDefaultFormData);

  // Reset form and state when component mounts
  useEffect(() => {
    dispatch(resetAddClientConfigureState());
    form.setFormData(clientCompanyDefaultFormData);
    return () => {
      dispatch(resetAddClientConfigureState());
    };
  }, [dispatch]);

  const onChange = e => {
    const { name, value, type } = e.target;
    // Handle checkbox/select values properly
    const finalValue =
      type === 'checkbox'
        ? e.target.checked
        : name === 'userActive' || name === 'dbActive'
        ? value === 'true'
        : value;
    form.handleChange({ target: { name, value: finalValue } });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate required fields before submission
    const requiredFields = [
      'companyName',
      'companyEmail',
      'userName',
      'userEmail',
      'userPassword',
      'dbIp'
    ];

    const missingFields = requiredFields.filter(field => !form.formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const payload = {
      ClientDisplayName: form.formData.companyName,
      ClientCity: form.formData.companyCity,
      ClientMasterEmail: form.formData.companyEmail,
      ClientMobile: form.formData.mobileNo,
      ClientPhone: form.formData.phoneNo,
      ClientBranchName: form.formData.branchName,
      BranchType: form.formData.branchType,
      ClientSubscriptionValidDate: form.formData.validityDate,
      ClientUserDisplayName: form.formData.userName,
      ClientUserEmail: form.formData.userEmail,
      ClientUserPassword: form.formData.userPassword,
      ClientUserActive: form.formData.userActive,
      ClientDBIP: form.formData.dbIp,
      ClientDBPassword: form.formData.dbPassword,
      ClientDBActive: form.formData.dbActive
    };

    try {
      const result = await dispatch(funcAddClientConfigure(payload)).unwrap();
      console.log('Submission successful:', result);
      // Optionally reset form or redirect on success
    } catch (err) {
      console.error('Submission failed:', err);
      // Error is already handled by the slice
    }
  };

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
                currentStep={tabEventKey}
              />
            </div>
          </Col>
          <Col xl={8} className="flex-1">
            <Row>
              <Col xxl={8}>
                {/* Status Messages */}
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="mt-3">
                    Client configuration saved successfully!
                  </Alert>
                )}

                <Tab.Content>
                  <Tab.Pane eventKey={1}>
                    <WizardForm step={1}>
                      <h4 className="mt-6 mb-3">Company Information</h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel
                            controlId="companyName"
                            label="Name*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="companyName"
                              value={form.formData.companyName || ''}
                              onChange={onChange}
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="companyCity"
                            label="City"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="companyCity"
                              value={form.formData.companyCity || ''}
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="companyEmail"
                            label="Email*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="email"
                              name="companyEmail"
                              value={form.formData.companyEmail || ''}
                              onChange={onChange}
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="mobileNo"
                            label="Mobile No"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="mobileNo"
                              value={form.formData.mobileNo || ''}
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="phoneNo"
                            label="Phone No"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="phoneNo"
                              value={form.formData.phoneNo || ''}
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>

                      <h4 className="mt-6 mb-3">Branch Details</h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel
                            controlId="branchName"
                            label="Branch Name"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="branchName"
                              value={form.formData.branchName || ''}
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="branchType"
                            label="Branch Type"
                            className="mb-3"
                          >
                            <Form.Select
                              name="branchType"
                              value={form.formData.branchType || ''}
                              onChange={onChange}
                            >
                              <option value="">Select Branch Type</option>
                              <option value="B2B">B2B</option>
                              <option value="B2C">B2C</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="validityDate"
                            label="Validity Date"
                            className="mb-3"
                          >
                            <Form.Control
                              type="date"
                              name="validityDate"
                              value={form.formData.validityDate || ''}
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </WizardForm>
                  </Tab.Pane>

                  <Tab.Pane eventKey={2}>
                    <WizardForm step={2}>
                      <h4 className="mt-6 mb-3">User Details</h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel
                            controlId="userName"
                            label="Name*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="userName"
                              value={form.formData.userName || ''}
                              onChange={onChange}
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="userEmail"
                            label="Email*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="email"
                              name="userEmail"
                              value={form.formData.userEmail || ''}
                              onChange={onChange}
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="userPassword"
                            label="Password*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="password"
                              name="userPassword"
                              value={form.formData.userPassword || ''}
                              onChange={onChange}
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="userActive"
                            label="User Active"
                            className="mb-3"
                          >
                            <Form.Select
                              name="userActive"
                              value={form.formData.userActive}
                              onChange={onChange}
                            >
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </WizardForm>
                  </Tab.Pane>

                  <Tab.Pane eventKey={3}>
                    <WizardForm step={3}>
                      <h4 className="mt-6 mb-3">Database Configuration</h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel
                            controlId="dbIp"
                            label="IP Address*"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              name="dbIp"
                              value={form.formData.dbIp || ''}
                              onChange={onChange}
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="dbPassword"
                            label="Password"
                            className="mb-3"
                          >
                            <Form.Control
                              type="password"
                              name="dbPassword"
                              value={form.formData.dbPassword || ''}
                              onChange={onChange}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel
                            controlId="dbActive"
                            label="DB Active"
                            className="mb-3"
                          >
                            <Form.Select
                              name="dbActive"
                              value={form.formData.dbActive}
                              onChange={onChange}
                            >
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>

                      <div className="mt-5 text-center">
                        <button
                          type="button"
                          className="btn btn-success px-5"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="ms-2">Saving...</span>
                            </>
                          ) : (
                            'Save'
                          )}
                        </button>
                      </div>
                    </WizardForm>
                  </Tab.Pane>
                </Tab.Content>

                <div className="mt-6">
                  <WizardFormFooter
                    currentStep={tabEventKey}
                    setCurrentStep={setTabEventKey}
                    totalSteps={3}
                  />
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
