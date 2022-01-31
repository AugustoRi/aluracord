import appConfig from "../config.json";

import { Box, Text, TextField, Image, Button, Icon } from "@skynexui/components";
import { supabaseClient } from "../services/supabase";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

function escutaMensagensTempoReal (mensagemVindaDoBanco) {
  return supabaseClient
    .from('mensagens')
    .on("INSERT", (respostaPegada) => {
      mensagemVindaDoBanco(respostaPegada);
    })
    .on("DELETE", (respostaPegada) => {
      mensagemVindaDoBanco(respostaPegada.old.id);
    })
    .subscribe();
}

export default function ChatPage() {
  const router = useRouter();
  const { username } = router.query;
  const [mensagem, setMensagem] = useState("");
  const [listaMensagensDoChat, setListaDeMensagensDoChat] = useState([]);

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        // console.log('dados', data);
        setListaDeMensagensDoChat(data);
      });

    const subscription = escutaMensagensTempoReal((mensagemVindaDoBanco) => {
      // console.log('Nova mensagem:', mensagemVindaDoBanco);

      if (mensagemVindaDoBanco.eventType === "INSERT") {
        setListaDeMensagensDoChat((valorAtualDaLista) => {
          return [mensagemVindaDoBanco.new, ...valorAtualDaLista,]
        });
      }
    });
  
    return () => {
      subscription.unsubscribe();
    }
  }, [])

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      texto: novaMensagem,
      user: username,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        mensagem,
      ])
      .then(({ data }) => {
        mensagem["id"] = data[0].id;
      })
    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100vh",
          maxWidth: "85vw",
          maxHeight: "90vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >

        <MessageList mensagens={listaMensagensDoChat} setMsg={setListaDeMensagensDoChat} />

          <Box
            tag="footer"
          >
            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Box
                styleSheet={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",

                  width: "100%",
                  border: "0",
                  resize: "none",
                  borderRadius: "5px",
                  padding: '5px 8px 0 15px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  // marginRight: "12px",
                  color: appConfig.theme.colors.neutrals[200],
                }}
              >
                <TextField
                  value={mensagem}
                  onChange={(event) => {
                    const valor = event.target.value;
                    setMensagem(valor);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();

                      handleNovaMensagem(mensagem);
                    }
                  }}
                  placeholder="Insira sua mensagem aqui..."
                  type="textarea"
                  styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    border: "0",
                    resize: "none",
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    marginRight: "12px",
                    color: appConfig.theme.colors.neutrals[200],
                  }}
                />
                {
                  mensagem.length === 0
                  ? (
                    <ButtonSendSticker 
                      onStickerClick={(sticker) => {
                        handleNovaMensagem(`:sticker: ${sticker}`)
                      }}
                    />
                  ) 
                  : (
                    <Icon
                      name="FaArrowCircleRight" 
                      size="4ch"
                      styleSheet={{
                        color: "currentColor",
                      }}
                      // colorVariant="positive"
                      onClick={(event) => {
                        event.preventDefault();
                        handleNovaMensagem(mensagem);
                      }}
                    />
                  )
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  const router = useRouter();
  const { username } = router.query;

  const handleDeletarMensagem = async (e, mensagemParaDeletar) => {
    e.preventDefault();
    const { data, error } = await supabaseClient
    .from('mensagens')
    .delete()
    .match({id: mensagemParaDeletar});

    // if ( data ) {
    //   props.setMsg(
    //     props.mensagens.filter((mensagem) => {
    //       return mensagem.id !== mensagemParaDeletar;
    //     })
    //   )
    // }
  };

  
  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        props.setMsg(data);
      })

  }, [handleDeletarMensagem])

  return (
    <Box
      styleSheet={{
        overflowY: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      <Box
        tag="ul"
        styleSheet={{
          wordBreak: "break-word",
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: "16px",
        }}
      >
        {props.mensagens?.map((mensagem) => {
          return (
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                overflow: "hidden",
                borderRadius: "5px",
                padding: "6px",
                marginBottom: "12px",
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            >
              <Box
                styleSheet={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                  src='/images/imagem-usuario-padrao.png'
                  // {`https://github.com/${mensagem.user}.png`}
                />
                <Text tag="strong">{mensagem.user}</Text>
                <Box
                  styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Text
                    styleSheet={{
                      fontSize: "10px",
                      marginLeft: "8px",
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {new Date().toLocaleDateString()}
                  </Text>

                  { username === mensagem.user ? 
                    <Icon
                      variant="tertiary"
                      name="FaTrash"

                      onClick={(event) => {handleDeletarMensagem(event, mensagem.id)}}
                      styleSheet={{
                        color: "#fff",
                        width: "10px",
                        hover: {
                          cursor: "pointer",
                          backgroundColor: "none",
                        },
                      }}
                    /> 
                  : ''}

                </Box>
              </Box>
              {
                mensagem.texto.startsWith(':sticker:')
                ? (
                  <Image
                    height='120px'
                    width='120px'
                    src={mensagem.texto.replace(':sticker:', '')} 
                  />
                ) 

                : (
                  mensagem.texto
                )  
              }
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
