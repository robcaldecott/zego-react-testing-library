import { useState } from "react";
import type { ReactNode } from "react";
import { useIntl, FormattedMessage, FormattedNumber } from "react-intl";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Skeleton,
  Button,
  PageError,
  Alert,
} from "@/components";
import type { Vehicle } from "@/types";
import { useVehicle, useDeleteVehicle } from "@/queries";
import { DeleteDialog } from "./DeleteDialog";

const Loading = () => {
  const intl = useIntl();

  return (
    <>
      <Breadcrumbs />

      <Card
        aria-label={intl.formatMessage({
          id: "loadingVehicle",
          defaultMessage: "Loading vehicle",
        })}
      >
        <CardHeader
          title={<Skeleton />}
          subheader={<Skeleton />}
          divider
          className="bg-sky-50"
        />
        <CardContent>
          {[...Array(16).keys()].map((key) => (
            <Skeleton key={key} height={20} />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

interface SwatchProps {
  color: string;
}

const Swatch = ({ color }: SwatchProps) => (
  <div className="flex space-x-1 items-center">
    <span
      className="h-4 w-4 rounded-full inline-block border border-slate-300"
      style={{ backgroundColor: color.replace(/ /g, "") }}
    />
    <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
  </div>
);

interface FieldProps {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

const Field = ({ id, label, value }: FieldProps) => (
  <>
    <dt
      id={id}
      className="font-sans text-base font-medium mt-4 first:mt-0 text-slate-900 dark:text-white"
    >
      {label}
    </dt>
    <dd
      className="font-sans text-base font-normal text-slate-500 dark:text-slate-300"
      aria-labelledby={id}
    >
      {value}
    </dd>
  </>
);

interface DataProps {
  data: Vehicle;
}

const Data = ({ data }: DataProps) => {
  const intl = useIntl();
  const [showDialog, setShowDialog] = useState(false);
  const { mutate, isError, error, reset } = useDeleteVehicle();
  const router = useRouter();

  return (
    <>
      <Breadcrumbs registrationNumber={data.registrationNumber} />

      <Card
        aria-label={intl.formatMessage({
          id: "vehicleDetails",
          defaultMessage: "Vehicle details",
        })}
      >
        <CardHeader
          title={`${data.manufacturer} ${data.model} ${data.type}`}
          subheader={data.registrationNumber}
          divider
        />
        <CardContent divider>
          <dl>
            {/* Color */}
            <Field
              id="color"
              label={<FormattedMessage id="color" defaultMessage="Colour" />}
              value={<Swatch color={data.color} />}
            />

            {/* Fuel */}
            <Field
              id="fuel"
              label={<FormattedMessage id="fuel" defaultMessage="Fuel" />}
              value={data.fuel}
            />

            {/* VIN */}
            <Field
              id="vin"
              label={<FormattedMessage id="vin" defaultMessage="VIN" />}
              value={data.vin}
            />

            {/* Mileage */}
            <Field
              id="mileage"
              label={<FormattedMessage id="mileage" defaultMessage="Mileage" />}
              value={<FormattedNumber value={data.mileage} />}
            />

            {/* Registration date */}
            <Field
              id="date"
              label={
                <FormattedMessage
                  id="registrationDate"
                  defaultMessage="Registration date"
                />
              }
              value={
                <FormattedMessage
                  id="fullRegistrationDate"
                  defaultMessage="{date, date, full}"
                  values={{ date: new Date(data.registrationDate) }}
                />
              }
            />
          </dl>
        </CardContent>
        <CardActions>
          {isError ? (
            <Alert
              grow
              label={`${error?.status}: ${error?.statusText}`}
              action={
                <Button variant="secondary" onClick={reset}>
                  <FormattedMessage id="close" defaultMessage="Close" />
                </Button>
              }
            />
          ) : (
            <Button
              variant="error"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              <FormattedMessage
                id="deleteVehicle"
                defaultMessage="Delete vehicle"
              />
            </Button>
          )}
        </CardActions>
      </Card>

      <DeleteDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onDelete={() => {
          mutate(data.id, {
            onSuccess: () => {
              router.replace("/");
            },
            onSettled: () => {
              setShowDialog(false);
            },
          });
        }}
      />
    </>
  );
};

const Error = PageError;

interface DetailsProps {
  id: string;
}

export const Details = ({ id }: DetailsProps) => {
  const { isLoading, isSuccess, data, isError, error, refetch } =
    useVehicle(id);

  return (
    <div className="max-w-3xl mx-auto">
      {isLoading && <Loading />}
      {isSuccess && <Data data={data!} />}
      {isError && <Error error={error} refetch={refetch} />}
    </div>
  );
};

Details.Loading = Loading;
Details.Data = Data;
Details.Error = Error;
