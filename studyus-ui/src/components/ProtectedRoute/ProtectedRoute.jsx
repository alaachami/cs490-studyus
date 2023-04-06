import AccessForbidden from "../AccessForbidden/AccessForbidden";
import { useAuthContext } from "../../contexts/auth";

export default function ProtectedRoute({ element }) {
  const { user, isProcessing } = useAuthContext();
  if (isProcessing) {
    return null;
  }
  if (!user?.email) {
    return <AccessForbidden />;
  }
  return <>{element}</>;
}
