import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withStyles } from '@material-ui/core/styles';
// Referance URL
// https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html

const styles = theme => ({
  textEditor: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 1000,
    marginTop : 20,  
  },

  editorHeight : {
    height : 300,
  }

});

class Editor extends Component {
   render() {
    const { classes } = this.props;
        return (
            <div className={classes.textEditor}>
               <CKEditor className='editorheight'
                    editor={ ClassicEditor }
                    data=""
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                       const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ editor => {
                       // console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        //console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editor);