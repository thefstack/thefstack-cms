import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

const ToastEditor = forwardRef((props, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getMarkdown: () => {
      return editorRef.current?.getInstance()?.getMarkdown();
    },
    getHTML: () => {
      return editorRef.current?.getInstance()?.getHTML();
    },
  }));

  const handleFocus = () => {
    console.log("Editor focused");
  };

  const handleChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    const markdownValue = editorInstance?.getMarkdown();
    if (props.onChange) {
      props.onChange(markdownValue);
    }
    
  };

  return (
    <Editor
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      initialValue={props.initialValue || "Hi there!"}
      ref={editorRef}
      onFocus={handleFocus}
      onChange={handleChange}
      usageStatistics={false}
      useCommandShortcut={true} // Enable keyboard shortcuts
      hooks={{
        addImageBlobHook: (blob, callback) => {
          // Handle image upload here
          callback(URL.createObjectURL(blob), "image-alt-text");
          return false;
        },
      }}
      customHTMLRenderer={{
        htmlBlock: {
          div(node) {
            return [
              {
                type: "openTag",
                tagName: "div",
                outerNewLine: true,
              },
              { type: "html", content: node.literal },
              {
                type: "closeTag",
                tagName: "div",
                outerNewLine: true,
              },
            ];
          },
        },
      }}
    />
  );
});

export default ToastEditor;
