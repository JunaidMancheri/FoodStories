import { NgModule } from "@angular/core";
import { FormatedBioPipe } from "./formatedBio.pipe";

@NgModule({
  declarations: [FormatedBioPipe],
  exports: [FormatedBioPipe],
})
export class FormatedBioModule {}