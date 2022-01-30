import appConfig from '../config.json';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';

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

  const imagemEscolhida = Math.floor(Math.random()*imagens.length)

  return imagens[imagemEscolhida];
}

function Titulo(props) {
  const Tag = props.tag;
  return (
    <>
      <Tag>{ props.children }</Tag>
      
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
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
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();

              if (username.trim() === '') {
                alert('Preencha seu nome.');
                return;
              }
              else if (username.length < 2) {
                alert('Seu nome tem que ter, ao mínimo, 3 caracteres.');
                return;
              } 

              route.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
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
                  backgroundColor: appConfig.theme.colors.neutrals[900],
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