import { Layout } from "../../common/components/layout.tsx";
import { useEffect, useState } from "react";
import { customersService } from "../root.ts";
import { CustomerEntity } from "../entities/customer-entity.ts";
import { Paginated } from "../../common/responses/paginated.ts";
import { Button, Group, Stack, Table, TextInput, Title } from "@mantine/core";
import { HasPermission } from "../../auth/components/has-permission.tsx";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDebouncedState } from "@mantine/hooks";
import { CustomerRow } from "../components/customer-row.component.tsx";
import { useFetch } from "../../common/hooks/use-fetch.ts";
import { notificationsService } from "../../common/root.ts";

export function ListCustomersPage() {
  const [customers, setCustomers] = useState<Paginated<CustomerEntity>>({} as Paginated<CustomerEntity>);
  const [search, setSearch] = useDebouncedState('', 500);
  const fetch = useFetch();

  async function getCustomers() {
    const customers = await fetch(async () => customersService.findAll());
    if (customers) {
      setCustomers(customers);
    }
  }

  useEffect(() => {
    getCustomers();
  }, []);

  async function deleteCustomer(id: string) {
    await customersService.delete(id);
    await getCustomers();

    notificationsService.success("Customer deleted successfully");
  }

  return (
    <Layout>
      <Group align="center" justify="space-between" h="100%">
        <Title order={2}>Customers</Title>
        <HasPermission permission={"customers#create"}>
          <Button component={Link} to={"/customers/create"} variant="gradient" gradient={{ from: "blue", to: "cyan" }} leftSection={<IconPlus size={16}/>}>
            Create customer
          </Button>
        </HasPermission>
      </Group>
      <TextInput
        mt="xl"
        defaultValue={search}
        placeholder="Search"
        size="sm"
        leftSection={<IconSearch size={16}/>}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Stack gap="xl" justify="center" align="center">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>NIF</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {customers.data?.map(customer => (
              <CustomerRow key={customer.id} customer={customer} deleteCustomer={deleteCustomer} />
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Layout>
  )
}