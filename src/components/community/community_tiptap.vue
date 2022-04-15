<template>  

      <div v-if="editor">
    <button class="btn btn-success" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      <i class='bx bx-heading' ></i>1
    </button>
    <button class="btn btn-success" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      <i class='bx bx-heading' ></i>2
    </button>
    <button class="btn btn-success" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      <i class='bx bx-heading' ></i>3
    </button>


    <button class="btn btn-success" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      <i class='bx bx-italic' ></i>
    </button>

    <button class="btn btn-success" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      <i class='bx bx-bold' ></i>
    </button>

    <button class="btn btn-success" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      <i class='bx bx-strikethrough' ></i>
    </button>

    <button class="btn btn-success" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
      <i class='bx bx-list-ol' ></i>
    </button>

    <button class="btn btn-success" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
      <i class='bx bxs-circle' ></i>
    </button>

    <button class="btn btn-success" @click="editor.chain().focus().splitListItem('listItem').run()" :disabled="!editor.can().splitListItem('listItem')">
      splitListItem
    </button>

      </div>
  <editor-content :editor="editor"  @input="input" v-model="message"/>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Dropcursor from '@tiptap/extension-dropcursor'
import Strike from '@tiptap/extension-strike'
import Heading from '@tiptap/extension-heading'
import { onBeforeUnmount,  ref } from 'vue';

export default {
  components: {
    EditorContent,
  },
   emits:['parent_message'],
  setup(props, context){
   //setup(){
    const message = ref('')
    let  editor = ( new Editor({
      editable:true,
      extensions: [
        Document,
        Paragraph,
        Text,
        Italic,
        Bold,
        BulletList,
        OrderedList,
        ListItem,
        Dropcursor,
        Strike,
        Heading.configure({
          levels: [1, 2, 3],
        }),
      ],
      content: `
        <p>This isn’t italic.</p>
        <p><em>This is italic.</em></p>
        <p><i>And this.</i></p>
        <p style="font-style: italic">This as well.</p>
      `,
    }))

 

  const input= ()=>{
    console.log("여기가 글자입니다.")
    console.log(message.value)
    console.log(editor)
    console.log(editor.options.element.innerText)
   context.emit('parent_message', editor.options.element.innerText);
  }

    
     onBeforeUnmount(() => {
       editor.destroy()
  })

    return {
      editor,input, message
    }}}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
  
  button{
   border-radius: 50%; 
  }

  img {
    max-width: 100%;
    height: auto;
  }
}


</style>