import { useState, useEffect, ReactNode } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import clsx from "clsx";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemLink,
  Skeleton,
  Text,
  PageError,
  SearchField,
} from "@/components";
import type { Vehicle } from "@/types";
import { useVehicles } from "@/queries";
import { useFilter } from "@/providers";

const Loading = () => {
  const intl = useIntl();

  return (
    <Paper
      aria-label={intl.formatMessage({
        id: "loadingVehicles",
        defaultMessage: "Loading vehicles",
      })}
    >
      <Text
        variant="h3"
        component="h1"
        className="p-4 border-b border-b-slate-300"
      >
        <Skeleton />
      </Text>
      <List dividers>
        {[...Array(10).keys()].map((key) => (
          <ListItem key={key}>
            <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const NoResults = () => (
  <div className="p-8 flex flex-col items-center space-y-4">
    <InformationCircleIcon className="text-indigo-700 dark:text-indigo-400 h-16 w-16" />

    <Text variant="h2" component="h2" align="center">
      <FormattedMessage
        id="noResultsTitle"
        defaultMessage="No matching vehicles found."
      />
    </Text>

    <Text variant="body1" align="center" color="secondary">
      <FormattedMessage
        id="noResultsMessage"
        defaultMessage="Please try a different filter."
      />
    </Text>
  </div>
);

interface BadgeProps {
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => (
  <span className="rounded-full px-2 inline-flex h-5 min-w-[20px] justify-center items-center bg-sky-700 dark:bg-sky-500 text-white font-sans text-xs font-medium">
    {children}
  </span>
);

const filterItems = (data: Vehicle[], filter: string) =>
  data.filter((vehicle) => {
    if (filter === "") {
      return true;
    }
    const re = new RegExp(filter, "i");
    const description = `${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`;
    return description.search(re) !== -1;
  });

interface DataProps {
  data?: Vehicle[];
}

export const Data = ({ data = [] }: DataProps) => {
  const intl = useIntl();
  const { filter, setFilter } = useFilter();
  const [items, setItems] = useState(filterItems(data, filter));
  useEffect(() => void setItems(filterItems(data, filter)), [filter, data]);

  return (
    <Paper
      aria-label={intl.formatMessage({
        id: "vehicleList",
        defaultMessage: "Vehicle list",
      })}
    >
      <div className="p-4 border-b border-b-slate-300 bg-sky-50 dark:bg-sky-900">
        <div className="flex items-center flex-wrap md:flex-nowrap space-y-4 md:space-y-0">
          <div className="flex grow basis-full items-center space-x-2">
            <Text variant="h2" component="h1">
              <FormattedMessage id="vehiclesTitle" defaultMessage="Vehicles" />
            </Text>
            <Badge>{items.length}</Badge>
          </div>

          <SearchField
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder={intl.formatMessage({
              id: "searchPlaceholder",
              defaultMessage: "Search",
            })}
            className="basis-full md:basis-1/3"
          />
        </div>
      </div>

      {items.length === 0 ? (
        <NoResults />
      ) : (
        <List dividers>
          {items.map((vehicle) => (
            <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`} passHref>
              <ListItemLink>
                <ListItemText
                  primary={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`}
                  secondary={vehicle.registrationNumber}
                />
                <ChevronRightIcon className="h-6 w-6 text-slate-500 shrink-0" />
              </ListItemLink>
            </Link>
          ))}
        </List>
      )}
    </Paper>
  );
};

const Error = PageError;

interface VehiclesProps {
  fabPadding?: boolean;
}

export const Vehicles = ({ fabPadding }: VehiclesProps) => {
  const { isLoading, isSuccess, data, isError, error, refetch } = useVehicles();

  return (
    <div className={clsx("max-w-5xl mx-auto", fabPadding && "mb-24")}>
      {isLoading && <Loading />}
      {isSuccess && <Data data={data} />}
      {isError && <Error error={error} refetch={refetch} />}
    </div>
  );
};

Vehicles.Loading = Loading;
Vehicles.Data = Data;
Vehicles.Error = Error;
