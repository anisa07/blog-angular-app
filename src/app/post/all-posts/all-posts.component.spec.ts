import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AllPostsComponent} from './all-posts.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {PostService} from '../../services/post.service';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import {UserService} from '../../services/user.service';

describe('AllPostsComponent', () => {
  let component: AllPostsComponent;
  let fixture: ComponentFixture<AllPostsComponent>;
  let userService = jasmine.createSpyObj('UserService', ['getUserId']);
  let getUserIdSpy = userService.getUserId.and.returnValue('userTestId1');
  let postService = jasmine.createSpyObj('PostService', ['readPosts']);
  let readPostsSpy = postService.readPosts.and.returnValue(of([
    {
      'id': '60720b4f4f87a8b937169f60',
      'authorId': '6071d0ac809b3196efa5a7a4',
      'author': 'test',
      'labels': [
        {
          '_id': '6069f5b237b5936123f6cb44',
          'name': 'test',
          'createdAt': '2021-04-04T17:21:54.487Z',
          'updatedAt': '2021-04-04T17:21:54.487Z',
        }
      ],
      'commentsCount': 11,
      'likesValue': 0,
      'title': 'dfd',
      'text': 'dfd , test, test',
      'filename': '',
      'updatedAt': '2021-05-14T15:47:12.818Z'
    },
    {
      "id":"609d9c83f702dbc8011f8231",
      "authorId":"604fe282117c4d20bcc458ba",
      "author":"Palpatine",
      "labels":[
        {
          "_id":"609b009a2ea00cb7839ce41d",
          "name":"Test",
          "createdAt":"2021-05-11T22:09:30.715Z",
          "updatedAt":"2021-05-11T22:09:30.715Z"
        }],
      "commentsCount":1,
      "likesValue":0,
      "title":"test",
      "text":"text , i can edit post",
      "filename":"8477a891f553457ed0b6a4239cf60711.jpg",
      "updatedAt":"2021-05-14T15:45:56.339Z"
    },
  ]));
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [AllPostsComponent],
      providers: [
        {
          provide: UserService, useValue: userService
        },
        {
          provide: PostService, useValue: postService
        },
        MatSnackBar, FormBuilder, MaterialModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AllPostsComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should display post list', async () => {
    expect(component).toBeTruthy();
    const viewSelect = await loader.getHarness(MatSelectHarness.with({
      selector: '[data-testid=select-view]'
    }));
    expect(await viewSelect.getValueText()).toBe('List');
    expect(readPostsSpy).toHaveBeenCalledTimes(1);
    await viewSelect.open();
    const viewOptions = await viewSelect.getOptions();
    await viewOptions[1].click();
    expect(await viewSelect.getValueText()).toBe('Grid');
    expect(readPostsSpy).toHaveBeenCalledTimes(2);
    const colsSelect = await loader.getHarness(MatSelectHarness.with({
      selector: '[data-testid=select-cols]'
    }));
    expect(await colsSelect.getValueText()).toBe('4');
    await colsSelect.open();
    const colsSelectOption = await colsSelect.getOptions();
    await colsSelectOption[1].click();
    expect(await colsSelect.getValueText()).toBe('5');
    await viewOptions[2].click();
    expect(await viewSelect.getValueText()).toBe('Table');
    const tableColumnsSelect = await loader.getHarness(MatSelectHarness.with({
      selector: '[data-testid=select-table-columns]'
    }));
    expect(readPostsSpy).toHaveBeenCalledTimes(3);
    expect(await tableColumnsSelect.getValueText()).toBe('Author, Title, Updated Date, Comments Count, Likes Value, Edit/Delete');
    await tableColumnsSelect.open();
    const tableSelectOption = await tableColumnsSelect.getOptions();
    await tableSelectOption[0].click();
    expect(await tableColumnsSelect.getValueText()).toBe('Title, Updated Date, Comments Count, Likes Value, Edit/Delete');
  });
});
