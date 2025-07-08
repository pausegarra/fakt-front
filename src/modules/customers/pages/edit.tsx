import { useParams } from "react-router-dom";
import { Layout } from "../../common/components/layout";
import { Button, Divider, Title } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { customersService } from "../root.ts";
import { useFetch } from "../../common/hooks/use-fetch.ts";
import { useForm } from "@mantine/form";
import { CustomerWithoutId } from "../types";
import { CustomerForm } from "../components/customer-form.tsx";
import { IconPencil } from "@tabler/icons-react";
import { notificationsService } from "../../common/root.ts";
import { NifOrEmailAlreadyExists } from "../exceptions/nif-or-email-already-exists.ts";
import { useErrorBoundary } from "react-error-boundary";

export function EditCustomerPage() {
  const {id} = useParams();
  const fetch = useFetch();
  const {showBoundary} = useErrorBoundary();
  const form = useForm<CustomerWithoutId>({
    initialValues: {
      name: "",
      contactName: "",
      email: "",
      nif: "",
      address: "",
      postcode: "",
      city: "",
      county: "",
      country: "",
    }
  });

  const getCustomer = useCallback(async () => {
    const customer = await fetch(async () => await customersService.findById(id || ""));
    form.setValues(customer || {});
  }, [id, fetch]);

  async function onSubmit() {
    try {
      await fetch(async () => customersService.update(id || "", form.values));
      notificationsService.success("Customer updated successfully");
    } catch (e: any) {
      if (e instanceof NifOrEmailAlreadyExists) {
        notificationsService.error(e.message);
        return;
      }

      showBoundary(e.message);
    }
  }

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <Layout>
      <Title order={2}>Edit customer</Title>
      <Divider mb={10} />

      <CustomerForm form={form} />

      <Button onClick={onSubmit} mt={10} type={"submit"} variant={"gradient"} gradient={{ from: "blue", to: "cyan" }} leftSection={<IconPencil size={16}/>}>
        Edit
      </Button>
    </Layout>
  )

}