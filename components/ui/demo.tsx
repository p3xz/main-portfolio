import ButtonWithIconDemo from "@/components/ui/button-witn-icon";
import { NotFoundPage } from "@/components/ui/404-page-not-found";

export function DemoOne() {
  return <ButtonWithIconDemo />;
}

export function PageNotFoundDemo() {
  return (
    <div className="w-full">
      <NotFoundPage />
    </div>
  );
}

export default DemoOne;
