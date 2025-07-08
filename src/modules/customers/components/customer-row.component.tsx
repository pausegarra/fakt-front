import { Button, Group, Table } from "@mantine/core";
import { CustomerEntity } from "../entities/customer-entity";
import { HasPermission } from "../../auth/components/has-permission.tsx";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type props = {
  customer: CustomerEntity;
  deleteCustomer: (id: string) => void;
}

export function CustomerRow({customer, deleteCustomer}: props) {

  return (
    <Table.Tr>
      <Table.Td>{customer.name}</Table.Td>
      <Table.Td>{customer.email}</Table.Td>
      <Table.Td>{customer.nif}</Table.Td>
      <Table.Td>
        <Group>
          <HasPermission permission={"customers#read"}>
            <Button size={"compact-xs"} component={Link} to={`/customers/${customer.id}`}>
              <IconEye size={16} stroke={1.6}/>
            </Button>
          </HasPermission>
          <HasPermission permission={"customers#update"}>
            <Button size={"compact-xs"} component={Link} bg={"orange"} to={`/customers/${customer.id}/edit`}>
              <IconEdit size={16} stroke={1.6}/>
            </Button>
          </HasPermission>
          <HasPermission permission={"customers#delete"}>
            <Button size={"compact-xs"} bg={"red"} onClick={() => deleteCustomer(customer.id)}>
              <IconTrash size={16} stroke={1.6}/>
            </Button>
          </HasPermission>
        </Group>
      </Table.Td>
    </Table.Tr>
  )
}