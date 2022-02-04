import { TextField } from "@skynexui/components";
import appConfig from '/config.json'
export function TextArea(props) {
  return (
    <TextField 
      {...props}
      textFieldColors={{  
        neutral: {
          textColor: appConfig.theme.colors.global["000"],
          mainColor: appConfig.theme.colors.global["900"], //border
          mainColorHighlight: appConfig.theme.colors.global["200"], //borderhover
          backgroundColor: appConfig.theme.colors.global["700"],
        },
      }}
    />
  );

}