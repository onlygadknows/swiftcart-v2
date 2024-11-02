import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Great deals with SwiftCart v2.0!",
  description: "Top of the line gadgets in a low price",
  keywords: "electronics, gadgets, cheap phones",
};

export default Meta;
