import AddCustomerPaymentSelector from "@/components/dashboard/contacts/customer/customer_payment/AddCustomerPaymentSelector";
import AddSupplierPaymentSelector from "@/components/dashboard/contacts/supplier/supplier_payment/AddSupplierPaymentSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";

interface IAddPaymentWrapperProps {
  setPaymentOpen: (paymentOpen: boolean) => void;
}

const AddPaymentWrapper: FC<IAddPaymentWrapperProps> = ({ setPaymentOpen }) => {
  return (
    <Tabs defaultValue="customer">
      <TabsList className="border">
        <TabsTrigger value="customer">Customer</TabsTrigger>
        <TabsTrigger value="supplier">Supplier</TabsTrigger>
      </TabsList>
      {/* CUSTOMER PAYMENT FORM */}
      <TabsContent value="customer">
        <AddCustomerPaymentSelector setPaymentOpen={setPaymentOpen} />
      </TabsContent>
      {/* SUPPLIER PAYMENT FORM */}
      <TabsContent value="supplier">
        <AddSupplierPaymentSelector setPaymentOpen={setPaymentOpen} />
      </TabsContent>
    </Tabs>
  );
};

export default AddPaymentWrapper;
