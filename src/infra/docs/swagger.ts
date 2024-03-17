const swaggerConfig = {
  openapi: "3.0.0",
  tags: [
    {
      name: "Customers",
      description: "Microserviço Customer",
    },
  ],
  paths: {
    "/customers": {
      post: {
        summary: "Cria um novo cliente",
        tags: ["Customers"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Customer",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Customer",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/customers/{document}": {
      get: {
        summary: "Retorna um cliente pelo Documento",
        tags: ["Customers"],
        parameters: [
          {
            in: "path",
            name: "document",
            required: true,
            schema: {
              type: "string",
            },
            description: "Documento do cliente a ser recuperado",
          },
        ],
        responses: {
          200: {
            description: "cliente retornado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Customer",
                },
              },
            },
          },
          404: {
            description: "cliente não encontrado",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/customers/mail/{mail}": {
      get: {
        summary: "Retorna um cliente pelo E-mail",
        tags: ["Customers"],
        parameters: [
          {
            in: "path",
            name: "mail",
            required: true,
            schema: {
              type: "string",
            },
            description: "E-mail do cliente a ser recuperado",
          },
        ],
        responses: {
          200: {
            description: "cliente retornado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Customer",
                },
              },
            },
          },
          404: {
            description: "cliente não encontrado",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/getCustomerQuee": {
      get: {
        summary: "obter as mensagem de pedido",
        tags: ["Customers"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Quee",
              },
            },
          },
        },
        responses: {
          200: {
            description: "mensagem recebida",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Quee",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },

    "/deleteUser": {
      delete: {
        summary: "exclusão dos dados pessoais",
        tags: ["Customers"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/deleteUser",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário removido com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/deleteUser",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Customer: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
            example: "Fernando",
          },
          lastName: {
            type: "string",
            example: "Bruno",
          },
          document: {
            type: "string",
            example: "46699824007",
          },
          email: {
            type: "string",
            example: "fernando.bruno@fiap.com.br",
          },
          cellphone: {
            type: "string",
            example: "11960809533",
          },
        },
        required: ["firstName", "lastName", "document", "email", "cellphone"],
      },
      Quee: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Olá seu pedido: {numero} esta sendo preparado ",
          },
        },
      },
      deleteUser: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
            example: "Fernando",
          },
          cellphone: {
            type: "string",
            example: "11960809533",
          },
        },
        required: ["firstName", "cellphone"],
      },
    },
  },
};

export default swaggerConfig;
