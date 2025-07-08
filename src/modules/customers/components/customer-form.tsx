import { Grid, TextInput, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CustomerWithoutId } from "../types";

type props = {
  form: UseFormReturnType<CustomerWithoutId>;
}

export function CustomerForm({form}: props) {
  return (
    <>
      <Title order={2}>Contact Data</Title>

      <Grid mb={10}>
        <Grid.Col span={{base: 12, md: 4}}>
          <TextInput label="Name" placeholder="John Doe SA" {...form.getInputProps("name")} />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 4}}>
          <TextInput label="Contact Name" placeholder="John Doe" {...form.getInputProps("contactName")} />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 4}}>
          <TextInput label="Email" placeholder="john@example.com" {...form.getInputProps("email")} />
        </Grid.Col>
      </Grid>

      <Title order={2}>Fiscal Data</Title>

      <Grid mb={10}>
        <Grid.Col span={{base: 12, md: 6}}>
          <TextInput label="NIF" placeholder="ES12345678Z" {...form.getInputProps("nif")} />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 6}}>
          <TextInput label="Address" placeholder="123 Main St." {...form.getInputProps("address")} />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 6}}>
          <TextInput label="Postcode" placeholder="12345" {...form.getInputProps("postcode")} />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 6}}>
          <TextInput label="City" placeholder="New York" {...form.getInputProps("city")} />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 6}}>
          <TextInput label="Country" placeholder="NY" {...form.getInputProps("country")} />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 6}}>
          <TextInput label="County" placeholder="NY" {...form.getInputProps("county")} />
        </Grid.Col>
      </Grid>

      <Title order={2}>Extras</Title>

      <TextInput label={"Extra email recipients"} placeholder={"john.doe@example.com, john.doe@example.com"} {...form.getInputProps("emailExtraRecipients")} />
    </>
  );
}