const { Duda } = require("@dudadev/partner-api");
const duda = new Duda({
  user: "65b4e99f67",
  pass: "7TWsoYEzNCEb",
});

const account_type = "CUSTOMER";
const getAccountName = () => {return `tmp_${(Math.random() + 1)
  .toString(36)
  .substring(8)}_${new Date().getTime()}`};
const permissions = [
  "INSITE",
  "RESET",
  "SEO",
  "STATS_TAB",
  "REPUBLISH",
  "EDIT",
  "BLOG",
  "PUSH_NOTIFICATIONS",
  "PUBLISH",
  "CUSTOM_DOMAIN",
];

async function DudaSite(
  template_id,
  data,
  option
) {
  const account_name = getAccountName();
  const { site_name } = await duda.sites.create({ template_id, data });
  if (!site_name) throw new Error("Error obtaining site name");
  await duda.accounts.create({ account_name, account_type });
  await duda.accounts.permissions.grantSiteAccess({
    account_name,
    site_name,
    permissions,
  });

  switch (option) {
    case "sso":
      const ssoresponse = await duda.accounts.authentication.getSSOLink({
        account_name,
        site_name,
        target: "RESET_SITE",
      });
      return ssoresponse;
    default:
      const welcomeresponse = await duda.accounts.authentication.getWelcomeLink(
        {
          account_name,
        }
      );
      console.log('welcome', welcomeresponse)
      return welcomeresponse;
  }
}

module.exports = DudaSite;
