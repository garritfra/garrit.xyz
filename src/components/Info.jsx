import React, { Component } from 'react';
import { Transition, Grid, Icon } from 'semantic-ui-react';

class Info extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { imgVisible: false };
  }


  componentDidMount() {
    this.setState({ imgVisible: true });
  }

  render() {
    const src = 'https://lh3.googleusercontent.com/Cfdxky15vbU3eL0jEICc3w-DzDFvBWCkAH1lkYEJRDoqkzRIjfatlgYI2evJmwbroJqxlBPuufcvd6WBiM45V7LvavlCGTbygcVaTuicG7qe7vRNw1iX_cSlgLmpQyrXoahxur1Z_WTT1i9LKPrBcxHVgbCMKZJ5RD3e24moA7FVoS8T5mvH2nttxhukIJwiFekVqPh-mkBNFA8N5FwhsG4yy7_Y8ffhDe-K3cF93F50c_PNUORkhdjNxEXsTHL7IGAdibWgUBCdZo1hnCc03SvNLiAsj9COISt7G8lEaJCTLqvR2PNyfm0YE5oUpls49KhhsMOj8RevR65KQhKCsX_ZixIQfQKfLjGc2gA72FUXHnSLknqcKzw_AB0rdv7VwohD1QN_KPPVzhZaBLEKq-ymjJ6nWtPFRM10f6NV6MpWDNZB_vFsSlmpOQny4393_KeB7w6uwIDFDLKZoPdmXxf51-xq3qQrSdT7c2Dq8XCQbySje743dCepP1wohbScTKzusg3TkF6Rbn5t-LSxWLS9ikei6eZhnVnIi7RvQOlU-IC6O1de6l2sHdl9HmYhjP8Dr_aVDte9XCWO2x_Vctbxw2R9x0Ywb6vewyUY=s659-no';

    const imgStyle = {
      // position: "left",
      width: '1em',
      height: '1em',
      margin: '10px',
      position: 'static',
      maxWidth: '200px',
    };
    const style = {
      margin: imgStyle.margin,
      'text-align': 'right',
      display: 'flex',
      flexDirection: 'row',
      maxHeight: '400px'
    };

    return (

      <Grid colums={2} style={style}>
        <Grid.Column width={6}>
          <div className="fluid" >
            <Transition visible={this.state.imgVisible} animation="scale" duration={500}>
              <Icon size="massive" style={imgStyle} name="hashtag" />
            </Transition>
          </div>
        </Grid.Column>
        <Grid.Column width={9}>
          <div className="fluid">
            <h1>Hello World</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus tincidunt ipsum id ultrices. Proin volutpat tortor neque, at consequat nunc mattis in. Suspendisse magna massa, accumsan non gravida sed, scelerisque laoreet nulla. Donec mauris arcu, dictum a ultricies eget, aliquam non lorem.</p>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Info;
