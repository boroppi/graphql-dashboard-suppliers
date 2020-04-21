import React, { Component } from "react";
import { Row } from "antd";
import {
  convertFromRaw,
  EditorState,
  convertToRaw,
  AtomicBlockUtils
} from "draft-js";
import { UploadOutlined } from "@ant-design/icons";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createDragNDropUploadPlugin from "@mikeljames/draft-js-drag-n-drop-upload-plugin";
import mockUpload from "./mockUpload";

import "draft-js-focus-plugin/lib/plugin.css";
import "draft-js-image-plugin/lib/plugin.css";
import "draft-js-alignment-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js-static-toolbar-plugin/lib/plugin.css";

import editorStyles from "./css/editorStyles.css";
import buttonStyles from "./css/buttonStyles.css";
import toolbarStyles from "./css/toolbarStyles.css";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton
} from "draft-js-buttons";
import { Button, Col } from "antd";
import CollectionsPage from "./CollectionsComponent";
import { INSERT_SUPPLIER } from "./graphql/mutations/insertSupplierData";

const sideToolbarPlugin = createSideToolbarPlugin();

const resizeablePlugin = createResizeablePlugin();
const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });
const { SideToolbar } = sideToolbarPlugin;
const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage
});

const plugins = [
  sideToolbarPlugin,
  imagePlugin,
  alignmentPlugin,
  resizeablePlugin,
  focusPlugin,
  blockDndPlugin,
  dragNDropFileUploadPlugin
];

const requiredSupplierFields = ["brand", "description", "year"];

/* eslint-disable */
const initialState = {
  entityMap: {
    "0": {
      type: "IMAGE",
      mutability: "IMMUTABLE",
      data: {
        src: "./canada-landscape-small.jpg"
      }
    }
  },
  blocks: [
    {
      key: "9gm3s",
      text:
        "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "ov7r",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {}
    },
    {
      key: "e23a8",
      text: "See advanced examples further down …",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};
/* eslint-enable */
export default class SimpleSideToolbarEditor extends Component {
  constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.insertImage = this.insertImage.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.handleSaveBtnClicked = this.handleSaveBtnClicked.bind(this);
  }
  state = {
    file: "",
    base64: "",
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    rowEditorState: ""
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  saveContent = editorState => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  focus = () => {
    this.editor.focus();
  };

  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const newEditorState = this.insertImage(
        this.state.editorState,
        reader.result
      );
      this.onChange(newEditorState);
    };
  }

  handleSaveBtnClicked(e, insertSupplierData) {
    let input = this.props.input;

    let missingFields = [];
    for (let requiredSuppField of requiredSupplierFields) {
      if (!input[requiredSuppField]) {
        missingFields.push(requiredSuppField);
      }
    }

    if (missingFields.length > 0) {
      this.props.setValidationErrors(missingFields);
      return;
    }

    e.preventDefault();
    insertSupplierData({
      variables: {
        supplier: {
          ...input,
          collections: {
            data: {
              title: "SUMMER",
              description: "SUMMER SEASON CLOTHES",
              products: { data: { product_id: 10 } } // Need to find a way to pass array of product ids
            }
          }
        }
      }
    });
  }

  insertImage = (editorState, base64) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: base64 }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };

  render() {
    return (
      <>
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
          <SideToolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              externalProps => (
                <>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <div className="draftJsToolbar__buttonWrapper__1Dmqh">
                    <button className="draftJsToolbar__button__qi1gf">
                      <UploadOutlined
                        {...externalProps}
                        title="tests"
                        onClick={e => this.upload.click()}
                      />
                    </button>
                  </div>
                </>
              )
            }
          </SideToolbar>
          <AlignmentTool />
        </div>
        {this.props.renderValidationErrors()}

        <Row justify="space-between">
          <Col>
            <Mutation mutation={INSERT_SUPPLIER}>
              {(insertSupplierData, { data }) => {
                let input = this.props.input;
                return (
                  <React.Fragment>
                    <Button
                      type="secondary"
                      onClick={e =>
                        this.handleSaveBtnClicked(e, insertSupplierData)
                      }
                    >
                      Save
                    </Button>
                  </React.Fragment>
                );
              }}
            </Mutation>
          </Col>
          <Col>
            <CollectionsPage />
          </Col>
        </Row>

        <input
          style={{ display: "none" }}
          type="file"
          ref={ref => (this.upload = ref)}
          onChange={this.handleImageChange}
        />
      </>
    );
  }
}
