import BaseNav from "./BaseNav.vue";

export type IBaseNav = InstanceType<typeof BaseNav>;
export interface IPage {
  text: string;
  url?: string;
  children?: IPage[];
  isDocument?: boolean;
  isPage?: boolean;
}

export const PAGES: IPage[] = [
  {
    text: "Gynaecology",
    children: [
      {
        text: "Guidelines",
        children: [
          { text: "EPAU", url: "gynaecology-guidelines-epau" },
          {
            text: "General Gynaecology",
            url: "gynaecology-guidelines-general",
          },
        ],
      },
      {
        text: "Prescribing",
        url: "gynaecology-prescribing",
      },
      {
        text: "Useful Contacts",
        url: "gynaecology-contacts",
      },
      {
        text: "% Change Calculator",
        url: "gynaecology-relative-change",
        isPage: true,
      },
    ],
  },
  {
    text: "Obstetrics",
    children: [
      {
        text: "Emergencies",
        url: "obstetrics-emergencies",
      },
      {
        text: "Guidelines",
        children: [
          { text: "Antenatal", url: "obstetrics-guidelines-antenatal" },
          { text: "Intrapartum", url: "obstetrics-guidelines-intrapartum" },
          { text: "Postnatal", url: "obstetrics-guidelines-postnatal" },
        ],
      },
      {
        text: "Prescribing",
        url: "obstetrics-prescribing",
      },
      {
        text: "Useful Contacts",
        url: "obstetrics-contacts",
      },
      {
        text: "CTG",
        url: "obstetrics-ctg",
      },
    ],
  },
];
