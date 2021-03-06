import appConfig from '../config.json';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, Image } from '@skynexui/components';
import { TextArea } from '../src/components/TextArea';

function GerarImagensAleatorias() {  
  const imagens = [
    '/images/background-0.jpg',
    '/images/background-1.jpg',
    '/images/background-2.jpg',
    '/images/background-3.jpg',
    '/images/background-4.jpg',
    '/images/background-5.jpg',
    '/images/background-6.jpg',
    '/images/background-7.jpg',
    '/images/background-8.jpg',
    '/images/background-9.jpg',
    '/images/background-10.jpg',
  ];

  // const imagemEscolhida = Math.floor(Math.random()*imagens.length)

  return imagens[9];
}

function Titulo(props) {
  const Tag = props.tag;
  return (
    <>
      <Tag>{ props.children }</Tag>
      
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.global["000"]};
          font-size: 1.6em;
          font-weight: 600;
        }
      `}</style>
    </>

  );
}

export default function PaginaInicial() {
  const [username, setUserName] = useState("");
  const [image, setImage] = useState("");
  const route = useRouter();

  useEffect(() => {
    setImage(GerarImagensAleatorias());
  }, [image])


  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          backgroundPosition: {xs: 'center'},
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            backgroundColor: appConfig.theme.colors.default.primary["400"],
            // boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            // backgroundColor: 'rgba( 31, 38, 135, 0.8 )',
            // boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            // borderRadius: '10px',
            // border: '1px solid rgba( 31, 38, 135, 0.18 )',
          }}
        >
          {/* Formul??rio */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();

              if (username.trim() === '') {
                alert('Preencha seu nome.');
                return;
              }
              else if (username.length < 2) {
                alert('Seu nome tem que ter, ao m??nimo, 3 caracteres.');
                return;
              } 

              route.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '45%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text 
              variant="body3" 
              styleSheet={{
                margin: '20px 0',
                color: appConfig.theme.colors.global["950"], 
                fontSize: '1.2em',
                fontWeight: '400', 
              }}
            >
                {appConfig.name}
            </Text>

            <TextArea 
              value={username}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              fullWidth
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              styleSheet={{
                marginTop: '15px',
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: '#06942E',
                mainColorLight: '#36E066',
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formul??rio */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '200px',
              padding: { sm: '16px'},
              backgroundColor: { sm: `${appConfig.theme.colors.default.primary["900"]}`},
              border: { sm: '1px solid'},
              borderColor: {sm: appConfig.theme.colors.neutrals[999]},
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src='/images/imagem-usuario-padrao.png'
              // { username?.length > 2 ? `https://github.com/${username}.png` 
              //   : '/images/imagem-usuario-padrao.png' }
            />

            {username.length > 2 && (
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: {
                    xs: appConfig.theme.colors.default[300],
                    xl: appConfig.theme.colors.default[400],
                  },
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            )}
            
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}