import type { NextPage } from "next";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { Vehicles } from "@/containers";
import { ResponsiveFab } from "@/components";
import { PlusIcon } from "@heroicons/react/solid";

const Home: NextPage = () => (
  <>
    <Vehicles fabPadding />

    <Link href="/create" passHref>
      <ResponsiveFab
        icon={PlusIcon}
        label={
          <FormattedMessage
            id="createVehicle"
            defaultMessage="Create Vehicle"
          />
        }
      />
    </Link>
  </>
);

export default Home;
