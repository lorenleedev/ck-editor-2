import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import {Font} from '@ckeditor/ckeditor5-font';
import {Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline} from '@ckeditor/ckeditor5-basic-styles';
import {Heading} from "@ckeditor/ckeditor5-heading";
import {FontBackgroundColor} from "@ckeditor/ckeditor5-font";
import {List} from "@ckeditor/ckeditor5-list";
import {
  Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload
} from '@ckeditor/ckeditor5-image';
import { LinkImage } from '@ckeditor/ckeditor5-link';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Link } from '@ckeditor/ckeditor5-link';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar, TableColumnResize, TableCaption, TableCellProperties, TableProperties } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { AutoImage } from '@ckeditor/ckeditor5-image';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';

const initEditor = async ({lang, initialData}) => {
  const element = document.querySelector( '#ck-editor' );

  const editor = await ClassicEditor.create( element, {
    plugins: [
      Essentials,
      Paragraph,
      Alignment,
      Font,
      Bold,
      Code,
      Italic,
      Strikethrough,
      Subscript,
      Superscript,
      Underline,
      Heading,
      FontBackgroundColor,
      List,
      IndentBlock,
      Indent,
      HorizontalLine,
      BlockQuote,
      Link,
      MediaEmbed,
      PasteFromOffice,
      Table,
      TableToolbar,
      TableColumnResize,
      TableCaption,
      TableCellProperties,
      TableProperties,
      TextTransformation,
      CloudServices,
      Autoformat,
      AutoImage,
      ImageInsert,
      Image,
      ImageCaption,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      LinkImage,
      ImageUpload,
      Base64UploadAdapter
    ],

    // Add the toolbar configuration.
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        'fontSize',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'code',
        'fontColor',
        'fontBackgroundColor',
        'superscript',
        'subscript',
        '|',
        'alignment',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
        '|',
        'horizontalLine',
        'blockQuote',
        'link',
        '|',
        'insertImage',
        'insertTable',
      ],
      shouldNotGroupWhenFull: false
    },
    language: lang === 'ko' ? 'ko' : 'en-gb',
    placeholder: lang === 'ko' ? '내용을 입력해주세요' : 'Please enter content',
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'linkImage'
      ],
      insert: {
        // If this setting is omitted, the editor defaults to 'block'.
        // See explanation below.
        type: 'auto'
      }
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
        'toggleTableCaption',
      ]
    }
  } );
  window.editor = editor;
  window.editor.setData(initialData);
}

// initEditor({lang: 'ko', initialData: ''});

window.addEventListener('message', (event) => {
    if (event.data.type === 'CKEDITOR_INIT') {
        console.log('CKEDITOR_INIT', event.data.data)
        initEditor({lang: event.data.lang, initialData: event.data.data});
    }

    if (event.data.type === 'CKEDITOR_SET_DATA' && window.editor) {
        window.editor.setData(event.data.data);
    }
    if (event.data.type === 'CKEDITOR_GET_DATA' && window.editor) {
        window.parent.postMessage({
        type: 'CKEDITOR_DATA',
        data: window.editor.getData()
        }, '*');
    }
});