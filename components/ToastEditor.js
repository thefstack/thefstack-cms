import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

const ToastEditor = forwardRef((props, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getMarkdown: () => {
      return editorRef.current?.getInstance()?.getMarkdown();
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
      initialValue={props.initialValue || "Hi there!"} // Use initialValue from props
      ref={editorRef}
      onFocus={handleFocus}
      onChange={handleChange}
    />
  );
});

export default ToastEditor;
