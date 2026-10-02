export type Carrier = {
  name: string;
  logo: string;
  brokers: string;
  doctors: string;
  members: string;
};

/** Brokerage order. Do not sort. */
export const carriers: Carrier[] = [
  {
    name: "Aetna",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb2236702f6c965f2a12.svg",
    brokers: "https://www.aetna.com/producer_public/login.fcc",
    doctors: "https://health.aetna.com/ahpublic/medcare-direct",
    members: "https://www.aetna.com/about-us/login.html#tab_content_section_tabs_link_tabs_2",
  },
  {
    name: "AmBetter",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb22b003fa300b30b093.svg",
    brokers: "https://broker.ambetterhealth.com/s/login/?ec=302&startURL=/s",
    doctors: "https://guide.ambetterhealth.com/",
    members:
      "https://sso.entrykeyid.com/as/authorization.oauth2?client_id=d7c335a0-f0b3-4eff-ab1d-17491944ec43&code_challenge=2vYKKcCJIAk2c7t9KN_GDj4DaXNU3VLS2cFd-7bahQE&code_challenge_method=S256&redirect_uri=https://my.ambetterhealth.com/s/entrykey-callback/callback&response_type=code&scope=openid+profile",
  },
  {
    name: "BCBS-MI",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb23b003fa2e0730b0a9.svg",
    brokers: "https://agentportal.bcbsm.com/",
    doctors:
      "https://doctors.bcbsm.com/app/public/#/one/city=&state=MI&postalCode=&country=&insurerCode=BCBSMI_I&productCode=&brandCode=BCBSMI",
    members: "https://member.bcbsm.com/mpa/responsive/#/Login",
  },
  {
    name: "BCBS-MO+OH",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb22618c8d155b707218.svg",
    brokers: "https://brokerportal.anthem.com/apps/ptb/bob/JGHLLNPMVZ",
    doctors: "https://www.anthem.com/find-care",
    members: "https://www.sydneyhealth.com/",
  },
  {
    name: "BCBS-TX",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb22618c8d155b707218.svg",
    brokers: "https://groupauthenticator.bcbstx.com/#/producer/login",
    doctors: "https://www.bcbstx.com/find-care/find-a-doctor-or-hospital",
    members: "https://www.sydneyhealth.com/",
  },
  {
    name: "Cigna",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb23b003fa84e330b0ab.svg",
    brokers: "https://cignaforbrokers.com/web/login",
    doctors: "https://ifphcpdir.cigna.com/web/public/consumer/directory/search?consumerCode=HDC003",
    members: "https://apps.apple.com/us/app/mycigna/id569266174",
  },
  {
    name: "HAP",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb22b003fa176630b091.svg",
    brokers:
      "https://portal.hap.org/auth/realms/prod/protocol/openid-connect/auth?response_type=code&client_id=digital-app&redirect_uri=https%3A%2F%2Fportal.hap.org%2Fmembernew%2Fsso%2Flogin&state=3a3a74a6-ac6d-44b9-999b-2fee6cd172f3&login=true&scope=openid",
    doctors: "https://hap.providerlookuponlinesearch.com/search",
    members: "https://portal.hap.org/idp/SSO.saml2",
  },
  {
    name: "Humana",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb22b2a2741d160ad136.svg",
    brokers: "https://agentportal.humana.com/Vantage/apps/index.html?agenthome=-1#!!/dual-eligibility-verification",
    doctors: "https://finder.humana.com/finder/medical?customerId=1",
    members: "https://account.humana.com/registration",
  },
  {
    name: "Molina",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb227bdf389917e5a065.svg",
    brokers: "https://molina.evolvenxt.com//portal/home.htm",
    doctors:
      "https://molina.sapphirethreesixtyfive.com/?ci=mi-marketplace&network_id=3&geo_location=42.52160000000001,-83.1633&locale=en_us",
    members:
      "https://login.molinahealthcare.com/as/authorize?response_type=code&client_id=0086fa05-63c7-43ce-99fc-8ca169f52d4d&redirect_uri=https://member.molinahealthcare.com/en/mymolinalogin&scope=openid+profile+email&state=e78c1cbd-53a4-4164-a6e0-eafed12f856f&nonce=dg6egaDEaP",
  },
  {
    name: "Oscar",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb23b003fa033f30b0ae.svg",
    brokers: "https://accounts.hioscar.com/account/login/?client_context=business",
    doctors: "https://www.hioscar.com/search/?networkId=017&year=2026",
    members: "https://www.hioscar.com/auth/login",
  },
  {
    name: "PriorityHealth",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb227bdf38d3bbe5a05c.svg",
    brokers:
      "https://agent.priorityhealth.com/agents/s/login/?_gl=1lsp56q_gaR0ExLjEuR0ExLjIuR0ExLjIuMTMyODU1MzA5MS4xNjYyMDU4MDkz_ga_BEYDW8D93KMTY2NTQzMTk5My4yNC4wLjE2NjU0MzE5OTMuMC4wLjA._ga_14FS8YZQHX",
    doctors: "https://web.healthsparq.com/healthsparq/public/#/one/insurerCode=PH_I&brandCode=PH",
    members: "https://member.priorityhealth.com/login",
  },
  {
    name: "UH1",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/6948ea2c106fdc2df376d7b7.svg",
    brokers: "https://www.uhone.com/Broker/Main/Default.aspx",
    doctors: "https://connect.werally.com/medicalProvider/root",
    members: "https://www.uhcmemberhub.com/tpa-ap-web/?navDeepDive=UHOne_publicMemberHomeDefaultContent",
  },
  {
    name: "UHC",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb227bdf382eace5a05f.svg",
    brokers: "https://www.uhcjarvis.com/content/jarvis/en/secure/home.html",
    doctors: "https://connect.werally.com/plans/uhc",
    members: "https://member.uhc.com/ifp/prelogin",
  },
  {
    name: "WellCare",
    logo: "https://assets.cdn.filesafe.space/ype2KmrozYL3noDGC7Zc/media/69acfb2236702f57045f2a0c.svg",
    brokers: "https://desktop.pingone.com/cnc-workbench-brk/Selection?cmd=selection",
    doctors: "https://findaprovider.wellcare.com/location",
    members:
      "https://sso.entrykeyid.com/as/authorization.oauth2?response_type=code&client_id=016413e2-0aae-4ddd-a4f3-8e445a9de51a&scope=openid%20profile&redirect_uri=https://member.wellcare.com/callback",
  },
];
