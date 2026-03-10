import { ErrorPage } from "@/widgets/error-page";

const NotFound = () => {
  return <ErrorPage code="404" message="Oops, source not found :(" />;
};

export default NotFound;
