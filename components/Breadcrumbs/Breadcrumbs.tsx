import { FormattedMessage } from "react-intl";
import Link from "next/link";

interface BreadcrumbsProps {
  registrationNumber?: string;
}

export const Breadcrumbs = ({ registrationNumber }: BreadcrumbsProps) => (
  <nav className="font-sans text-base font-normal mb-4">
    <ol className="flex space-x-2">
      <li>
        <Link href="/">
          <a className="text-sky-600 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-500 underline">
            <FormattedMessage id="home" defaultMessage="Home" />
          </a>
        </Link>
      </li>
      {registrationNumber && (
        <>
          <li className="text-slate-500 dark:text-slate-100" aria-hidden="true">
            /
          </li>
          <li className="text-slate-500 dark:text-slate-100">
            {registrationNumber}
          </li>
        </>
      )}
    </ol>
  </nav>
);
