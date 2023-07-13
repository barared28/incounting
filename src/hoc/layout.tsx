import Layout from "@/components/layout";
import Menus from "@/config/menu";

const withLayout = (Component: any, title?: string, isTranslated?: boolean) => {
  return () => (
    <>
      <Layout title={title} isTranslated={isTranslated || false} menus={Menus}>
        <Component />
      </Layout>
    </>
  );
};

export default withLayout;
