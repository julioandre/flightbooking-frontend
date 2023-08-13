import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    customAppBar: true;
  }
}
// const theme = createMuiTheme();
// export const customStyles = makeStyles((theme)=>{
//     root:{
//
//     }
// })

export const custStyles = createTheme({
  // components: {
  //   MuiAppBar: {
  //     variants: [
  //       {
  //         props: { variant: 'customAppBar' },
  //         style: {
  //           background: 'secondary.light',
  //         },
  //       },
  //     ],
  //   },
  // },
});
