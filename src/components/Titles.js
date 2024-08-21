const MainTitle = (title, urlIcon) => {
  const view = `
    <h1 class="text-center" style="font-size: 30px;">
        <img src="${urlIcon}" alt="" width="40px" style="
    vertical-align: top;">
        ${title}
    </h1>
    `;
  return view;
};
const SubTitle = (title, urlIcon) => {
  const view = `
    <h5>
        <img src="${urlIcon}" alt="" width="27px" style="
    vertical-align: top;">
        ${title}
    </h5>
    `;
  return view;
};
const MiniSubTitle = (title, urlIcon) => {
  const view = `
    <h6 class = "text-primary">
        <img src="${urlIcon}" alt="" width="22px" style="
    vertical-align: top;">
        ${title}
    </h6>
    `;
  return view;
};
export { MainTitle, SubTitle, MiniSubTitle };
