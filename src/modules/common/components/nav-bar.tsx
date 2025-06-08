import { NavLink as MNavLink } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { HasPermission } from "./has-permission.tsx";

export function NavBar() {
  return (
    <>
      <Nav
        to="/dashboard"
      >
        Dashboard
      </Nav>
      <HasPermission permission={"customers#read"}>
        <Nav
          to="/customers"
        >
          Customers
        </Nav>
      </HasPermission>
    </>
  )
}

type NavLinkProps = {
  to: string;
  children: ReactNode;
}

function Nav ({ to, children }: NavLinkProps) {
  return <MNavLink
      to={to}
      label={children}
      rightSection={<IconChevronRight size={16} stroke={1.6}/>}
      component={NavLink}
    />
}