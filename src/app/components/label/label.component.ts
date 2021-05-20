import {Component, forwardRef, Input} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import {Label} from '../../models/Label';
import {PostService} from '../../services/post.service';
import {emptyLabelsValidator} from '../../utils/validators/empty-labels-validator';
import {MatChipInputEvent} from '@angular/material/chips';
import {CustomBaseComponent} from '../custom-base/custom-base.component';

@Component({
  selector: 'post-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LabelComponent),
      multi: true
    }
  ]
})
export class LabelComponent extends CustomBaseComponent {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input()
  labels: Label[] = [];
  error: ValidationErrors;

  constructor(private postService: PostService) {
    super()
  }

  add(event: MatChipInputEvent): void {
    this.error = null;
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.postService.createLabel(value.trim()).subscribe((l: Label) => {
          this.labels = [...this.labels, l];
          this.onChange(this.labels);
          this.onValidatorChange();
        },
        err => {
          this.error = err?.error?.message;
        }
      )
    } else {
      this.onValidatorChange();
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Label): void {
    const index = this.labels.indexOf(fruit);

    if (index >= 0) {
      this.labels.splice(index, 1)
      this.onChange(this.labels);
      this.onValidatorChange();
    }
  }

  ngOnInit(): void {
  }

  validate(c: FormControl) {
    this.error = emptyLabelsValidator(c)
    return this.error;
  }

  getLabelErrorMessage() {
    if (this.error?.emptyLabels) {
      return "At least one post tag is required"
    }
    return ""
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.labels = value;
    }
  }
}
