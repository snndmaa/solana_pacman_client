export const IDL = {
    "version": "0.1.0",
    "name": "score_betting_game",
    "instructions": [
      {
        "name": "initializeEscrow",
        "accounts": [
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "player",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "depositFunds",
        "accounts": [
          {
            "name": "player",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "submitScore",
        "accounts": [
          {
            "name": "player",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "score",
            "type": "u64"
          },
          {
            "name": "targetScore",
            "type": "u64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "escrowAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "amount",
              "type": "u64"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "InsufficientFundsInEscrow",
        "msg": "Not enough funds in escrow account."
      }
    ]
  };
  