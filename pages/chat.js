import { Box, Text, TextField, Image, Button, Icon } from "@skynexui/components";
import React, { useState } from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  const [mensagem, setMensagem] = useState("");
  const [listaMensagensDoChat, setListaDeMensagensDoChat] = useState([]);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      user: "augusto",
      id: listaMensagensDoChat.length + 1,
      texto: novaMensagem,
    };

    setListaDeMensagensDoChat([mensagem, ...listaMensagensDoChat]);
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
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
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
                  padding: {
                    xl: "16px",
                    xs: "8px",
                  },
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: "12px",
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
                <Button 
                  iconName="arrowRight" 
                  colorVariant="positive"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNovaMensagem(mensagem);
                  }}
                />
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
  console.log("MessageList", props.mensagens);

  const handleDeletarMensagem = (e, mensagemParaDeletar) => {
    e.preventDefault();

    props.setMsg(
      props.mensagens.filter((mensagem) => {
        return mensagem.id !== mensagemParaDeletar;
      })
    )
  };

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
                  src={`https://github.com/${appConfig.user}.png`}
                />
                <Text tag="strong">{mensagem.user}</Text>
                <Box
                  styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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

                  <Button
                    variant="tertiary"
                    iconName="FaTrashAlt"

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
                </Box>
              </Box>
              {mensagem.texto}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
