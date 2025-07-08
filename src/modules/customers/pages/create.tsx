import { Layout } from "../../common/components/layout.tsx";
import { Button, Divider, Title } from "@mantine/core";
import { CustomerForm } from "../components/customer-form.tsx";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { CustomerWithoutId } from "../types";
import { useFetch } from "../../common/hooks/use-fetch.ts";
import { customersService } from "../root.ts";
import { notificationsService } from "../../common/root.ts";
import { useErrorBoundary } from "react-error-boundary";
import { NifOrEmailAlreadyExists } from "../exceptions/nif-or-email-already-exists.ts";
import { useNavigate } from "react-router-dom";

export function CreateCustomer() {
  const fetch = useFetch();
  const {showBoundary} = useErrorBoundary();
  const navigate = useNavigate();
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
      emailExtraRecipients: "",
    },
  });

  async function onSubmit() {
    try {
      await fetch(async () => customersService.create(form.values));
      notificationsService.success("Customer created successfully");
      form.reset();
      navigate("/customers");
    } catch (e: any) {
      if (e instanceof NifOrEmailAlreadyExists) {
        notificationsService.error(e.message);
        return;
      }

      showBoundary(e.message);
    }
  }

  return <Layout>

    <Title>Create Customer</Title>
    <Divider mb={10} />

    <CustomerForm form={form} />

    <Button onClick={onSubmit} mt={10} type={"submit"} variant={"gradient"} gradient={{ from: "blue", to: "cyan" }} leftSection={<IconPlus size={16}/>}>
      Save
    </Button>

  </Layout>;
}