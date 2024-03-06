import { useState } from "react";
import Business from "./Business/Business";
import Tax from "./Tax/Tax";
import ContactComponent from "./ContactComponent/ContactComponent";
import Product from "./Product/Product";
import Sale from "./Sale/Sale";
import POSComponent from "./POS/POSComponent";
import Purchases from "./Purchases/Purchases";
import Payment from "./Payment/Payment";
import Dashbord from "./Dashbord/Dashbord";
import System from "./System/System";
import Prefixes from "./Prefixes/Prefixes";
import EmailSetting from "./EmailSetting/EmailSetting";
import SMSSetting from "./SMSSetting/SMSSetting";
import Reward from "./RewardPonitSettings/Reward";
import Modules from "./Modules/Modules";
import Customlabels from "./CustomLabels/Customlabels";

const BusinessSettingsPage = () => {
  const [business, setbusiness] = useState<boolean>(true);
  const [tax, settax] = useState<boolean>(false);
  const [product, setproduct] = useState<boolean>(false);
  const [contact, setcontact] = useState<boolean>(false);
  const [sale, setsale] = useState<boolean>(false);
  const [pos, setpos] = useState<boolean>(false);
  const [purchases, setpurchases] = useState<boolean>(false);
  const [payment, setpayment] = useState<boolean>(false);
  const [dashboard, setdashboard] = useState<boolean>(false);
  const [system, setsystem] = useState<boolean>(false);
  const [prefixes, setprefixes] = useState<boolean>(false);
  const [emailsetting, setemailsetting] = useState<boolean>(false);
  const [smssetting, setsmssetting] = useState<boolean>(false);
  const [rewardpoint, setrewardpoint] = useState<boolean>(false);
  const [modules, setmodules] = useState<boolean>(false);
  const [custom, setcustom] = useState<boolean>(false);
  const businessHandles = () => {
    setbusiness(true);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const taxHandle = () => {
    setbusiness(false);
    settax(true);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const productHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(true);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const contactHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(true);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const saleHanlde = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(true);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const posHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(true);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const purchasesHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(true);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const paymentHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(true);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const dashboardHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(true);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const systemHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(true);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const prefixesHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(true);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const emailsettingHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(true);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const smssettingHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(true);
    setrewardpoint(false);
    setmodules(false);
    setcustom(false);
  };
  const rewardpointHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(true);
    setmodules(false);
    setcustom(false);
  };
  const modulesHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(true);
    setcustom(false);
  };
  const customHandle = () => {
    setbusiness(false);
    settax(false);
    setproduct(false);
    setcontact(false);
    setsale(false);
    setpos(false);
    setpurchases(false);
    setpayment(false);
    setdashboard(false);
    setsystem(false);
    setprefixes(false);
    setemailsetting(false);
    setsmssetting(false);
    setrewardpoint(false);
    setmodules(false);
    setcustom(true);
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl">Business Settings</h2>
      </div>
      <div className="lg:grid grid-cols-4 gap-4 mt-5">
        <div className="">
          <div className="my-2">
            <button
              onClick={businessHandles}
              className="border-2 rounded-md py-1 w-full"
            >
              Business
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={taxHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Tax
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={productHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Product
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={contactHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Contact
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={saleHanlde}
              className="border-2 rounded-md py-1 w-full"
            >
              Sale
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={posHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              POS
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={purchasesHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Purchases
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={paymentHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Payment
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={dashboardHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Dashboard
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={systemHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              System
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={prefixesHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Prefixes
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={emailsettingHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Email Settings
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={smssettingHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              SMS Setting
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={rewardpointHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Reward Point Settings
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={modulesHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Modules
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={customHandle}
              className="border-2 rounded-md py-1 w-full"
            >
              Custom Labels
            </button>
          </div>
        </div>
        <div className="col-span-3">
          {business ? <Business /> : null}
          {tax ? <Tax /> : null}
          {product ? <Product /> : null}
          {contact ? <ContactComponent /> : null}
          {sale ? <Sale /> : null}
          {pos ? <POSComponent /> : null}
          {purchases ? <Purchases /> : null}
          {payment ? <Payment /> : null}
          {dashboard ? <Dashbord /> : null}
          {system ? <System /> : null}
          {prefixes ? <Prefixes /> : null}
          {emailsetting ? <EmailSetting /> : null}
          {smssetting ? <SMSSetting /> : null}
          {rewardpoint ? <Reward /> : null}
          {modules ? <Modules /> : null}
          {custom ? <Customlabels /> : null}
          <div className="flex justify-center">
            <button className="bg-red-500 px-3 py-1 text-white rounded-md mt-5">
              Update Setting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsPage;
