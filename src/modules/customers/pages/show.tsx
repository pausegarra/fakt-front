import { CustomerEntity } from "../entities/customer-entity.ts";
import { Layout } from "../../common/components/layout.tsx";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { customersService } from "../root.ts";
import { useFetch } from "../../common/hooks/use-fetch.ts";
import { Card, Divider, Grid, Title } from "@mantine/core";

export function ShowCustomer() {
  const {id} = useParams();
  const [customer, setCustomer] = useState<CustomerEntity>({} as CustomerEntity);
  const fetch = useFetch();
  
  const getCustomer = useCallback(async () => {
    const customer = await fetch(async () => await customersService.findById(id || ""));
    if (customer) {
      setCustomer(customer);
    }
  }, [id, fetch]);

  useEffect(() => {
    getCustomer();
  }, []);
  
  return (
    <Layout>
      <Title order={2}>Customer</Title>
      <Divider mb={10} />

      <Title order={3}>Contact Data</Title>
      <Card>
        <Grid>
          <Grid.Col span={{base: 12, md: 4}}>
            <p><strong>Name:</strong> {customer.name}</p>
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 4}}>
            <p><strong>Contact Name:</strong> {customer.contactName}</p>
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 4}}>
            <p><strong>Email:</strong> {customer.email}</p>
          </Grid.Col>
        </Grid>
      </Card>

      <Title order={3}>Fiscal Data</Title>
      <Card>
        <Grid>
          <Grid.Col span={{base: 12, md: 6}}>
            <p><strong>NIF:</strong> {customer.nif}</p>
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 6}}>
            <p><strong>Address:</strong> {customer.address}</p>
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 6}}>
            <p><strong>Postcode:</strong> {customer.postcode}</p>
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 6}}>
            <p><strong>City:</strong> {customer.city}</p>
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 6}}>
            <p><strong>County:</strong> {customer.county}</p>
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 6}}>
            <p><strong>Country:</strong> {customer.country}</p>
          </Grid.Col>
        </Grid>
      </Card>

      <Title order={3}>Emails</Title>
      <Card>
        <p><strong>Email extra recipients:</strong> {customer.emailExtraRecipients}</p>
      </Card>
    </Layout>
  )
}