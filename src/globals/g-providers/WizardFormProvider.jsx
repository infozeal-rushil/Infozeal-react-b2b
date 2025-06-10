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
import { createContext, useContext } from 'react';
import { Tab } from 'react-bootstrap';
export const WizardFormContext = createContext(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
{});
const WizardFormProvider = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const { selectedStep, goToStep } = rest;
    return (<WizardFormContext.Provider value={Object.assign({}, rest)}>
      <Tab.Container activeKey={selectedStep} onSelect={(eventKey) => {
            if (eventKey) {
                goToStep(Number(eventKey));
            }
        }}>
        {children}
      </Tab.Container>
      {/* <WizardAccessDeniedModal /> */}
    </WizardFormContext.Provider>);
};
export const useWizardFormContext = () => useContext(WizardFormContext);
export default WizardFormProvider;
