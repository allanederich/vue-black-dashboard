#!/bin/bash

# firebase target:apply hosting portal ecwl-ajx-portal -P ecwl-ajx

COLOR_CYAN="\033[0;36m"
COLOR_PURPLE="\033[0;35m"
COLOR_RED="\033[0;31m"
COLOR_NO_COLOR="\033[0m"

function message::echo() {
  echo -e "${COLOR_CYAN}${COLOR_PURPLE}$@${COLOR_NO_COLOR}"
}

while : 
do
	message::echo "#####################################################################"
	message::echo "### NÃO ESQUECER DE CONFERIR O LOGIN DA FIREBASE {firebase login} ###"
	message::echo "#####################################################################"
	message::echo "30 - PRD"
	message::echo "99 - SAIR"

	read OP

	if [ "$OP" -gt 99 ]; then
		echo "Você Esta realizando deploy em PRODUÇÃO!!!"
		read -p "Deseja continuar (y/n)? " OPProd
		
		if [ "$OPProd" != "y" ] && [ "$OPProd" != "Y" ]; then
		   echo "Operação finalizada sem execução de deploy."
			exit 1
		fi
	fi

	case $OP in
		30)
        npm run build-prd;
		firebase deploy
		;;
		99) message::echo "\n ;P \n"; exit ;;
	esac
done
