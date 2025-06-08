import { Layout } from "../../common/components/layout.tsx";
import { useEffect, useState } from "react";
import { customersService } from "../root.ts";
import { CustomerEntity } from "../entities/customer-entity.ts";
import { Paginated } from "../../common/responses/paginated.ts";
import { Button, Group, Stack, Table, TextInput, Title } from "@mantine/core";
import { HasPermission } from "../../common/components/has-permission.tsx";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDebouncedState } from "@mantine/hooks";
import { CustomerRow } from "../components/customer-row.component.tsx";

export function ListCustomersPage() {
  const [customers, setCustomers] = useState<Paginated<CustomerEntity>>({} as Paginated<CustomerEntity>);
  const [search, setSearch] = useDebouncedState('', 500);

  async function getCustomers() {
    const customers = await customersService.findAll();
    setCustomers(customers);
  }

  useEffect(() => {
    getCustomers();
  }, []);

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
              <CustomerRow key={customer.id} customer={customer}/>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Layout>
  )
}